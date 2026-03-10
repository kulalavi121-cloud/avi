from sqlalchemy import Column, Integer, Float, Date
from database import Base

class WWTPData(Base):
    __tablename__ = "wwtp_data"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)

    cod = Column(Float)
    bod = Column(Float)
    mlss = Column(Float)
    mlvss = Column(Float)
    do = Column(Float)
    ph = Column(Float)
    svi = Column(Float)
    turbidity = Column(Float)
    sludge_age = Column(Float)
    hrt = Column(Float)
    flow = Column(Float)
