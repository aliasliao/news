DROP TABLE IF EXISTS archives;
DROP TABLE IF EXISTS origins;
DROP TABLE IF EXISTS news;

/*
CREATE TABLE IF NOT EXISTS categories (
  id       INT(2) NOT NULL AUTO_INCREMENT,
  archive  VARCHAR(8) NOT NULL,

  CONSTRAINT PRIMARY KEY (id)

) ENGINE=InnoDB, DEFAULT CHARSET=utf8;
*/

CREATE TABLE IF NOT EXISTS origins (
  id      INT(2) NOT NULL AUTO_INCREMENT,
  origin  VARCHAR(8) NOT NULL,

  CONSTRAINT PRIMARY KEY (id)

) ENGINE=InnoDB, DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS news (
  id        VARCHAR(32) NOT NULL,       -- news id
  title     VARCHAR(64) NOT NULL,   -- news title
  url       VARCHAR(256) NOT NULL,  -- news link url
  timeline  DATETIME NOT NULL,      -- news time
  category  INT(2) NOT NULL,        -- news archive --
  summary   VARCHAR(256),           -- news desc
  tags      JSON,                   -- tags
  source    VARCHAR(16),            -- where it comes
  image     VARCHAR(256),                   -- panel img
  content   TEXT,                   -- body
  origin    INT(2) NOT NULL,        -- where craws --

  CONSTRAINT PRIMARY KEY (id),
  CONSTRAINT FOREIGN KEY (origin) REFERENCES origins (id)

) ENGINE=InnoDB, DEFAULT CHARSET=utf8;

/*
INSERT INTO archives (archive) VALUES
  ('要闻'), ('财经'), ('体育'), ('娱乐'), ('房产'),
  ('科技'), ('汽车'), ('数码'), ('时尚'), ('星座'),
  ('游戏'), ('文化'), ('社会'), ('教育'), ('other');
 */

INSERT INTO origins (origin) VALUES
  ('今日头条'), ('一点资讯');
