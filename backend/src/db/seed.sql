CREATE TABLE IF NOT EXISTS customers (
    customer_id   SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tickets (
    ticket_id         SERIAL PRIMARY KEY,
    customer_id       INTEGER NOT NULL REFERENCES customers(customer_id),
    failure_category  TEXT,
    resolved          BOOLEAN NOT NULL DEFAULT FALSE,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tickets_customer_unresolved
    ON tickets (customer_id, resolved)
    WHERE resolved = FALSE;

-- Customers
INSERT INTO customers (customer_name) VALUES
    ('Acme Corp'),
    ('Bright Labs'),
    ('ZenFlow'),
    ('NullCo'),
    ('Titan Systems');

-- Acme Corp (id=1) — populated state
INSERT INTO tickets (customer_id, failure_category, resolved) VALUES
    (1, 'integration_error',       FALSE),
    (1, 'integration_error',       FALSE),
    (1, 'integration_error',       FALSE),
    (1, 'integration_error',       FALSE),
    (1, 'integration_error',       FALSE),
    (1, 'billing_confusion',       FALSE),
    (1, 'billing_confusion',       FALSE),
    (1, 'billing_confusion',       FALSE),
    (1, 'billing_confusion',       FALSE),
    (1, 'feature_misunderstanding',FALSE),
    (1, 'feature_misunderstanding',FALSE),
    (1, 'feature_misunderstanding',FALSE),
    (1, 'onboarding_friction',     FALSE),
    (1, 'onboarding_friction',     FALSE),
    (1, 'api_timeout',             FALSE),
    (1, 'integration_error',       TRUE),
    (1, 'billing_confusion',       TRUE),
    (1, NULL,                      FALSE);

-- Bright Labs (id=2) — populated state (fewer categories)
INSERT INTO tickets (customer_id, failure_category, resolved) VALUES
    (2, 'feature_misunderstanding',FALSE),
    (2, 'feature_misunderstanding',FALSE),
    (2, 'feature_misunderstanding',FALSE),
    (2, 'billing_confusion',       FALSE),
    (2, 'billing_confusion',       FALSE),
    (2, 'billing_confusion',       TRUE);

-- ZenFlow (id=3) — empty state (all resolved)
INSERT INTO tickets (customer_id, failure_category, resolved) VALUES
    (3, 'integration_error',       TRUE),
    (3, 'billing_confusion',       TRUE),
    (3, 'feature_misunderstanding',TRUE);

-- NullCo (id=4) — empty state (no tickets)

-- Titan Systems (id=5) — populated state (equal counts)
INSERT INTO tickets (customer_id, failure_category, resolved) VALUES
    (5, 'integration_error',       FALSE),
    (5, 'integration_error',       FALSE),
    (5, 'billing_confusion',       FALSE),
    (5, 'billing_confusion',       FALSE),
    (5, 'feature_misunderstanding',FALSE),
    (5, 'feature_misunderstanding',FALSE);
