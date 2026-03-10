from pydantic import BaseModel
from typing import Optional, List
from datetime import date

class WWTPDataSchema(BaseModel):
    id: int
    date: date
    cod: float
    bod: float
    mlss: float
    mlvss: float
    do: float
    ph: float
    svi: float
    turbidity: float
    sludge_age: float
    hrt: float
    flow: float

    class Config:
        from_attributes = True

class PaginatedWWTPData(BaseModel):
    total: int
    items: List[WWTPDataSchema]