### This file will modify googleplaystore_user_reviews.csv from kaggle dataset: https://www.kaggle.com/lava18/google-play-store-apps

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import math
from sklearn.preprocessing import LabelEncoder
from sklearn.impute import SimpleImputer

# ###VERSION 1
# # Reading csv file
# df = pd.read_csv(r"C:\Users\Javier Alonso\Desktop\Work\HackatonIA_2021\data_treatment\raw_csv\googleplaystore_user_reviews.csv")
# # Delete columns Sentiment_Polarity and Sentiment_Subjectivity
# del df['Sentiment_Polarity']
# del df['Sentiment_Subjectivity']

# #take out commas from columns App and Translated_Reviews
# # Get rid of NaN values in Sentiment, App and Trusted_Reviews columns in the dataset
# df.dropna(subset=['Sentiment'], inplace=True)
# df.dropna(subset=['Translated_Review'], inplace=True)
# df.dropna(subset=['App'], inplace=True)

# df['Translated_Review'] = df['Translated_Review'].map(lambda x: ''.join(x.split(',')))
# df['App'] = df['App'].map(lambda x: ''.join(x.split(',')))

# # Add new column at the beggining holding app_name+review
# df.insert(0, column="Text", value=df['App']+" "+ df['Translated_Review'])

# # Delete App and Translated_Review columns
# del df['App']
# del df['Translated_Review']



# # Rename column Sentiment to Label
# df.rename(columns={'Sentiment':'Label'}, inplace=True)
# # Where the new csv is being persisted
# df.to_csv(r"C:\Users\Javier Alonso\Desktop\Work\HackatonIA_2021\data_treatment\processed_csv\googleplaystore_user_reviews_v2.csv", index=False)

# print('TERMINE BB')


###VERSION 2
# Reading csv file
df = pd.read_csv(r"C:\Users\Javier Alonso\Desktop\Work\HackatonIA_2021\data_treatment\raw_csv\googleplaystore_user_reviews.csv")
# Delete columns Sentiment_Polarity and Sentiment_Subjectivity
del df['Sentiment_Polarity']
del df['Sentiment_Subjectivity']
del df['App']
#take out commas from columns App and Translated_Reviews
# Get rid of NaN values in Sentiment, App and Trusted_Reviews columns in the dataset
df.dropna(subset=['Sentiment'], inplace=True)
df.dropna(subset=['Translated_Review'], inplace=True)

df['Translated_Review'] = df['Translated_Review'].map(lambda x: ''.join(x.split(',')))

#make all sentiments lower case
df['Sentiment'] = df['Sentiment'].map(lambda x: x.lower())

# Rename columns Sentiment and Translanted_Review to Label
df.rename(columns={'Sentiment':'Label'}, inplace=True)
df.rename(columns={'Translated_Review':'Text'}, inplace=True)

# Where the new csv is being persisted
df.to_csv(r"C:\Users\Javier Alonso\Desktop\Work\HackatonIA_2021\data_treatment\processed_csv\googleplaystore_user_reviews_v3.csv", index=False)

print('TERMINE BB')