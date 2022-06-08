drop database if exists products;
create database products;

\c products;

drop table if exists products CASCADE;
create table if not exists products(
    id serial primary key,
    name varchar(100) not null,
    slogan varchar(255) not null,
    description text not null,
    category varchar(255) not null,
    default_price varchar(10) not null
);

drop table if exists product_information CASCADE;
create table if not exists product_information(
    id serial primary key,
    product_id int not null,
    feature varchar(255) not null,
    value varchar(255) not null,
    foreign key(product_id) references products(id)
        on delete cascade on update cascade
);

drop table if exists product_styles CASCADE;
create table if not exists product_styles(
    id serial primary key,
    product_id int,
    name varchar(255) not null,
    original_price varchar(100),
    sale_price varchar(100),
    default_style bool,
    foreign key(product_id) references products(id)
        on delete cascade on update cascade
);

drop table if exists related_products CASCADE;
create table if not exists related_products(
    id serial primary key,
    parent_product int,
    related_product int,
    foreign key(parent_product) references products(id)
        on delete cascade on update cascade
);

drop table if exists photos CASCADE;
create table if not exists photos(
    id serial primary key,
    product_styles_id int,
    url text,
    thumbnail_url text,
    foreign key(product_styles_id) references product_styles(id)
        on delete cascade on update cascade
);

-- DROP TYPE IF EXISTS sizes CASCADE;
-- create TYPE sizes AS ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL');

drop table if exists skus CASCADE;
create table if not exists skus(
    id serial primary key,
    product_styles_id int,
    size varchar(25) not null,
    quantity int,
    foreign key(product_styles_id) references product_styles(id)
        on delete cascade on update cascade
);

-- psql postgres -U jerrytapia -f schemas/postgres_schema.sql