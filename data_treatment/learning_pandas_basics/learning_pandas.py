import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import math
from sklearn.preprocessing import LabelEncoder
from sklearn.impute import SimpleImputer

#leer archivo csv en la posicion root de este archivo.
df = pd.read_csv(r"C:\Users\Javier Alonso\Desktop\Work\HackatonIA_2021\data_treatment\learning_pandas_basics\testing_csv.csv")
#imprimir columna, valor.
print(df['text'][1])
#insertar columna con valores
#df.insert(0, column="third_column", value=df['text']+df['label'])
#borrar columna
#del df['third_column']
#crear nuevo csv
#df.to_csv('testing_csv.csv', index=False)
# Reading csv file