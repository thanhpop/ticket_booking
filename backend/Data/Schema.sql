

CREATE TABLE IF NOT EXISTS users
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    username   VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 --   role_id INT NOT NULL, 
  --  FOREIGN KEY (role_id) REFERENCES roles(id)
    INDEX idx_email (email),
    INDEX idx_username (username)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

  CREATE TABLE IF NOT EXISTS movie
(
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    title        VARCHAR(255) NOT NULL,
    poster       VARCHAR(255),
    overview     TEXT,
    duration     INT          NOT NULL,
    genres       JSON,
    release_date DATE,
    imdb_id      VARCHAR(255),
    film_id      VARCHAR(255),
    language     VARCHAR(100),
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_title (title),
    INDEX idx_release_date (release_date)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

  CREATE TABLE IF NOT EXISTS theater
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(255) NOT NULL,
    location   VARCHAR(255),
    capacity   INT          NOT NULL,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;


  CREATE TABLE IF NOT EXISTS showtime
(
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    movie_id        BIGINT         NOT NULL,
    theater_id      BIGINT         NOT NULL,
    show_date       DATE           NOT NULL,
    show_time       TIME           NOT NULL,
    price           DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_seats     INT            NOT NULL,
    available_seats INT            NOT NULL,
    created_at      DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_movie_showtime FOREIGN KEY (movie_id) REFERENCES movie (id) ON DELETE CASCADE,
    CONSTRAINT fk_theater_showtime FOREIGN KEY (theater_id) REFERENCES theater (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

  CREATE TABLE IF NOT EXISTS seat
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT,
    showtime_id    BIGINT      NOT NULL,
    seat_number    VARCHAR(20) NOT NULL,
    status         ENUM ('AVAILABLE', 'BOOKED') DEFAULT 'AVAILABLE',
    created_at     DATETIME    NOT NULL         DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME    NOT NULL         DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_seat_showtime FOREIGN KEY (showtime_id) REFERENCES showtime (id) ON DELETE CASCADE,
    UNIQUE ( showtime_id, seat_number)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;