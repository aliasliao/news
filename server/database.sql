# DROP TABLE IF EXISTS news;
# DROP TABLE IF EXISTS user;
#
#
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


CREATE TABLE IF NOT EXISTS user (
  id       int(8)   NOT NULL AUTO_INCREMENT,   -- user id
  username VARCHAR(16)  NOT NULL,                  -- user name
  password VARCHAR(16)  NOT NULL,                  -- user password
  email    VARCHAR(128) NOT NULL,                  -- user email
  interest JSON,  -- intresting category, eg: '["科技“, "国际”]', set by user
  habit    JSON,  -- reading habits, eg: '[{"category": "国际", "times": 12}]', update with user use

  CONSTRAINT id_pk PRIMARY KEY (id),
  CONSTRAINT username_unique UNIQUE (username),
  CONSTRAINT email_unique UNIQUE (email)

) ENGINE=InnoDB, DEFAULT CHARSET=utf8;
