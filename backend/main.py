from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
import asyncio

from database import Base, engine, SessionLocal
from models import WWTPData
from schemas import PaginatedWWTPData
from seed_data import generate_data
from anomaly import detect_anomalies
from recommender import generate_recommendation
from crud import get_data

# WWTP Dashboard API - Production Deployment
app = FastAPI(title="WWTP Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_db():
    async with SessionLocal() as session:
        yield session

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # We can seed data if empty
    # Note: seed_data is likely synchronous, we might need a workaround or adapt it,
    # but for now we assume it's handled or we can just run it in a thread.
    async with SessionLocal() as db:
        from sqlalchemy.future import select
        result = await db.execute(select(WWTPData).limit(1))
        first = result.scalars().first()
        if not first:
            await generate_data()

@app.get("/api/v1/data", response_model=PaginatedWWTPData)
async def fetch_data(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: AsyncSession = Depends(get_db)
):
    return await get_data(db, skip=skip, limit=limit)

@app.get("/api/v1/anomalies")
async def fetch_anomalies(
    limit: int = Query(10, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    anomalies = await detect_anomalies(db, limit=limit)
    return anomalies

@app.post("/api/v1/recommendations")
async def fetch_recommendations(data: dict):
    # Takes a single row dict of current values to recommend actions
    return generate_recommendation(data)