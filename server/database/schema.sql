create table user (
  id int unsigned primary key auto_increment not null,
  firstname varchar(80) not null,
  lastname varchar(80) not null,
  email varchar(255) not null,
  city varchar(80),
  admin boolean not null
);

create table cars (
  id int unsigned primary key auto_increment not null,
  brand varchar(80) not null,
  model varchar(80) not null,
  socket varchar(155) not null,
  user_id int unsigned not null,
  foreign key (user_id) references user(id)
);

create table stations (
  id int unsigned primary key auto_increment not null,
  address varchar(255) not null,
  geo_x float not null,
  geo_y float not null,
  power float not null,
  spots float not null,
  type varchar(255) not null
);

