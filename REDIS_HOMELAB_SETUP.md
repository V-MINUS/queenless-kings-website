# Redis Homelab Setup Guide

This guide will help you set up Redis on your Linux homelab for the Queenless Kings website rate limiting.

## Quick Setup with Docker

### 1. Create Docker Compose File

Create `docker-compose.redis.yml` on your Linux server:

```yaml
version: '3.8'

services:
  redis:
    image: redis:7-alpine
    container_name: queenless-kings-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes --requirepass YOUR_STRONG_PASSWORD_HERE
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

volumes:
  redis-data:
    driver: local
```

### 2. Start Redis

```bash
# On your Linux homelab
cd /path/to/docker/configs
docker-compose -f docker-compose.redis.yml up -d

# Check it's running
docker ps | grep redis
docker logs queenless-kings-redis
```

### 3. Test Connection

```bash
# From the server
docker exec -it queenless-kings-redis redis-cli
AUTH YOUR_STRONG_PASSWORD_HERE
PING
# Should respond: PONG

# Test from your Windows dev machine
# Install redis-cli or use telnet
telnet YOUR_HOMELAB_IP 6379
```

### 4. Configure Firewall (if needed)

```bash
# Allow Redis port from your local network
sudo ufw allow from 192.168.1.0/24 to any port 6379
# Or for specific IP
sudo ufw allow from YOUR_DEV_MACHINE_IP to any port 6379
```

## Environment Configuration

### For Local Development (.env.local)

```bash
# Use your homelab Redis
REDIS_URL=redis://:YOUR_STRONG_PASSWORD_HERE@YOUR_HOMELAB_IP:6379
```

Examples:
- No password: `redis://192.168.1.100:6379`
- With password: `redis://:mySecurePassword123@192.168.1.100:6379`
- Localhost: `redis://:password@localhost:6379`

### For Production (Vercel)

You have two options for production:

**Option 1: Use Upstash Cloud (Recommended for Vercel)**
```bash
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

**Option 2: Expose Homelab Redis (Advanced)**
- Set up reverse proxy (Nginx/Caddy) with SSL
- Use Cloudflare Tunnel or similar
- Configure REDIS_URL with public endpoint

## Redis Persistence & Backup

### Enable AOF (Append-Only File)

Already enabled in the docker-compose with `--appendonly yes`

### Manual Backup

```bash
# Backup Redis data
docker exec queenless-kings-redis redis-cli --raw BGSAVE
docker cp queenless-kings-redis:/data/dump.rdb ./redis-backup-$(date +%Y%m%d).rdb

# Restore from backup
docker cp ./redis-backup-20260317.rdb queenless-kings-redis:/data/dump.rdb
docker restart queenless-kings-redis
```

### Automated Backup Script

```bash
#!/bin/bash
# /opt/scripts/backup-redis.sh

BACKUP_DIR="/backups/redis"
CONTAINER="queenless-kings-redis"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
docker exec $CONTAINER redis-cli --raw BGSAVE
sleep 5
docker cp $CONTAINER:/data/dump.rdb $BACKUP_DIR/redis-$DATE.rdb

# Keep only last 7 days
find $BACKUP_DIR -name "redis-*.rdb" -mtime +7 -delete
```

Add to crontab:
```bash
# Daily backup at 3 AM
0 3 * * * /opt/scripts/backup-redis.sh
```

## Monitoring

### Check Redis Stats

```bash
docker exec -it queenless-kings-redis redis-cli
AUTH YOUR_PASSWORD
INFO stats
INFO memory
DBSIZE
```

### Monitor Rate Limiting Keys

```bash
# See all contact form rate limit keys
KEYS contact:*

# Check specific IP
GET contact:192.168.1.50

# See all keys and their TTL
SCAN 0 MATCH contact:* COUNT 100
```

## Security Best Practices

1. **Always use a strong password**
2. **Bind to specific network interface** (not 0.0.0.0 if possible)
3. **Use firewall rules** to restrict access
4. **Enable SSL/TLS** for production (use stunnel or Redis 6+ TLS)
5. **Regular backups** with the script above
6. **Monitor logs** for suspicious activity

## Troubleshooting

### Connection Refused

```bash
# Check if Redis is running
docker ps | grep redis

# Check logs
docker logs queenless-kings-redis

# Test connection
docker exec -it queenless-kings-redis redis-cli ping
```

### Authentication Failed

```bash
# Verify password in docker-compose.yml
docker exec -it queenless-kings-redis redis-cli
AUTH YOUR_PASSWORD
```

### High Memory Usage

```bash
# Check memory
docker exec -it queenless-kings-redis redis-cli INFO memory

# Set max memory limit (add to docker-compose command)
command: redis-server --appendonly yes --requirepass PASSWORD --maxmemory 256mb --maxmemory-policy allkeys-lru
```

## Rate Limiting Behavior

The contact form API will:

1. **First choice**: Use Upstash Redis (if `UPSTASH_REDIS_REST_URL` is set)
2. **Second choice**: Use local Redis (if `REDIS_URL` is set)
3. **Fallback**: Use in-memory rate limiting (resets on server restart)

**Rate Limit**: 5 requests per minute per IP address

## Testing

Test the rate limiting:

```bash
# Make 6 requests quickly to trigger rate limit
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Testing rate limit","turnstileToken":"test"}' \
    && echo ""
done
```

You should see "Too many requests" on the 6th request.

## Production Deployment Notes

For Vercel deployment, you have two options:

### Option A: Upstash Cloud (Easiest)
- Sign up at https://upstash.com (free tier: 10K commands/day)
- Create a Redis database
- Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to Vercel env vars

### Option B: Homelab with Cloudflare Tunnel
1. Set up Cloudflare Tunnel on your homelab
2. Expose Redis through the tunnel with authentication
3. Add `REDIS_URL` to Vercel env vars pointing to your tunnel endpoint

**Recommendation**: Use Upstash for production (Vercel) and local Redis for development.
