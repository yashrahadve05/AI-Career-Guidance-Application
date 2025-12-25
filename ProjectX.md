## Technical Indicators Used

### 1. Moving Average (SMA / EMA)
Moving Averages smooth the price data and highlight the underlying trend direction.  
They help the model understand whether the market is in an uptrend or downtrend and reduce noise in raw price signals.

### 2. MACD (Moving Average Convergence Divergence)
MACD captures both trend and momentum by measuring the difference between fast and slow exponential moving averages.  
It helps the model detect trend changes, acceleration, and early signs of reversals.

### 3. RSI (Relative Strength Index)
RSI measures the strength of recent price movements and identifies overbought and oversold conditions.  
It helps the model recognize when momentum is weakening and when price corrections are likely.

### 4. Bollinger Bands
Bollinger Bands capture market volatility and price extremes relative to a moving average.  
They help the model detect breakout conditions, volatility compression, and regime changes.

### 5. ATR (Average True Range)
ATR measures the magnitude of price movement and reflects overall market volatility.  
It helps the model adapt its predictions depending on whether the market is calm or highly volatile.

---

## Machine Learning Algorithms Used

### 1. LSTM (Long Short-Term Memory)
LSTM is a deep learning model designed for time-series data.  
It learns sequential patterns and long-term dependencies in stock prices, allowing it to model historical trends and temporal behavior.

### 2. XGBoost (Extreme Gradient Boosting)
XGBoost is a tree-based ensemble learning algorithm that captures nonlinear relationships between engineered features and price movement.  
It is effective for learning complex interactions among technical indicators.

---

## How Indicators Improve Accuracy and Precision

Each indicator provides a specific type of market information:

| Indicator | Contribution |
|-----------|-------------|
| Moving Average | Trend direction |
| MACD | Trend strength and momentum |
| RSI | Momentum exhaustion and reversals |
| Bollinger Bands | Volatility and price extremes |
| ATR | Market volatility regime |

Together, these indicators transform raw stock prices into structured features representing trend, momentum, volatility, and market conditions.  
This reduces noise, prevents overfitting, and allows the models to generalize better, leading to higher accuracy and improved precision.

---

## Hybrid Model Approach

The project uses a hybrid modeling approach:

- LSTM is trained on historical price sequences to capture temporal dependencies.
- XGBoost is trained on technical indicator features to capture nonlinear relationships.
- The predictions from both models are combined to generate the final output.

This hybrid approach leverages the strengths of both sequence-based learning and feature-based learning, improving robustness and reducing individual model errors.

---

## Summary

- Technical indicators provide structured financial signals instead of raw noisy prices.
- LSTM captures long-term sequential patterns in price movements.
- XGBoost captures nonlinear relationships among indicators.
- The hybrid approach improves prediction stability, accuracy, and generalization.
