create table user (
  id int unsigned primary key auto_increment not null,
  firstname varchar(80) not null,
  lastname varchar(80) not null,
  city varchar(80) not null,
  email varchar(255) not null unique,
  hashed_password varchar(255) not null,
  image text,
  admin boolean default 0 not null
);

create table car (
  id int unsigned primary key auto_increment not null,
  brand varchar(80) not null,
  model varchar(80) not null,
  socket varchar(155) not null,
  user_id int unsigned not null,
  foreign key (user_id) references user(id)
);

create table station (
  id int unsigned primary key auto_increment not null,
  address varchar(255) not null,
  geo_x float not null,
  geo_y float not null,
  power float not null,
  spots float not null,
  type varchar(255) not null
);

create table socket (
  id int unsigned primary key auto_increment not null,
  type varchar(155) not null
);

create table rent (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id int unsigned not null,
  station_id int unsigned not null,
  car_id int unsigned not null,
  start_time datetime not null,
  end_time datetime not null,
  foreign key (station_id) references station(id),
  foreign key (user_id) references user(id),
  foreign key (car_id) references car(id)
);

create table usermessage (
  firstname varchar(80) not null,
  lastname varchar(80) not null,
  email varchar(255) not null,
  subject varchar(250),
  message text not null
);