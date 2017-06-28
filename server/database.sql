DROP TABLE IF EXISTS archives;
DROP TABLE IF EXISTS origins;
DROP TABLE IF EXISTS news;


CREATE TABLE IF NOT EXISTS news (
  id        VARCHAR(32) NOT NULL,   -- news id
  title     VARCHAR(64) NOT NULL,   -- news title
  url       VARCHAR(256) NOT NULL,  -- news link url
  time      DATETIME NOT NULL,      -- news time
  category  VARCHAR(8) NOT NULL,    -- news category
  abstract  VARCHAR(256),           -- news abstract
  source    VARCHAR(16),            -- where it comes, the media name
  image     VARCHAR(256),           -- panel img
  content   TEXT,                   -- body

  CONSTRAINT PRIMARY KEY (id)

) ENGINE=InnoDB, DEFAULT CHARSET=utf8;
