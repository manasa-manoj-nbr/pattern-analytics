-- Top 3 most frequent unresolved failure categories for a given customer.
--
-- Optimisation notes:
--   • Single INNER JOIN — one DB round-trip, no N+1
--   • IS NOT NULL in WHERE (pre-GROUP BY) — filters before aggregation
--   • Parameterised $1 — prevents SQL injection, enables plan caching
--   • LIMIT 3 pushed to DB — no in-app slicing
--   • Supported by partial index: idx_tickets_customer_unresolved

SELECT
    c.customer_name,
    t.failure_category,
    COUNT(*)::INTEGER AS ticket_count
FROM tickets t
INNER JOIN customers c
    ON c.customer_id = t.customer_id
WHERE
    t.customer_id        = $1
    AND t.resolved       = FALSE
    AND t.failure_category IS NOT NULL
GROUP BY
    c.customer_name,
    t.failure_category
ORDER BY
    ticket_count DESC
LIMIT 3;
