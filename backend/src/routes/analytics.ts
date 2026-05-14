import { Router, Request, Response, NextFunction } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import pool from '../db/pool';

const router = Router();

const TOP_FAILURES_QUERY = readFileSync(
  join(__dirname, '..', 'queries', 'topFailures.sql'),
  'utf-8'
);

router.get(
  '/top-failures/:customer_id',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const rawId = String(req.params.customer_id);
    const customerId = parseInt(rawId, 10);

    if (isNaN(customerId) || customerId <= 0) {
      res.status(400).json({
        error: 'Invalid customer_id. Must be a positive integer.',
      });
      return;
    }

    try {
      const result = await pool.query(TOP_FAILURES_QUERY, [customerId]);

      const customerName =
        result.rows.length > 0 ? result.rows[0].customer_name : null;

      res.json({
        customerId,
        customerName,
        data: result.rows.map((row) => ({
          failure_category: row.failure_category as string,
          ticket_count: row.ticket_count as number,
        })),
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
