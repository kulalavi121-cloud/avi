from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from .models import WWTPData

async def get_data(db: AsyncSession, skip: int = 0, limit: int = 100):
    query = select(WWTPData).order_by(WWTPData.date.desc(), WWTPData.id.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    items = result.scalars().all()

    count_query = select(func.count()).select_from(WWTPData)
    total_result = await db.execute(count_query)
    total = total_result.scalar()

    return {"total": total, "items": items}

async def get_all_data(db: AsyncSession):
    query = select(WWTPData)
    result = await db.execute(query)
    return result.scalars().all()