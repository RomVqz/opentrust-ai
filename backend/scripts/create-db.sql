

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    risk_profile VARCHAR(50) DEFAULT 'medium',
    average_transaction_amount DECIMAL(15, 2) DEFAULT 0,
    total_transactions INTEGER DEFAULT 0
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    sender_wallet VARCHAR(255) NOT NULL,
    receiver_wallet VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    risk_score INTEGER NOT NULL,
    explanation TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    factors JSONB,
    country_code VARCHAR(2),
    payment_method VARCHAR(50)
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_timestamp ON transactions(timestamp);
CREATE INDEX idx_transactions_risk_score ON transactions(risk_score);