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
    feature varchar(255) not null not null,
    value varchar(255) not null not null,
    product_id int not null not null,
    foreign key(product_id) references products(id)
        on delete cascade on update cascade
);

drop table if exists product_styles CASCADE;
create table if not exists product_styles(
    id serial primary key,
    name varchar(255) not null,
    original_price int not null,
    sale_price int,
    default_style bool,
    product_id int,
    foreign key(product_id) references products(id)
        on delete cascade on update cascade
);

drop table if exists related_products CASCADE;
create table if not exists related_products(
    parent_product int,
    related_product int,
    foreign key(parent_product) references products(id)
        on delete cascade on update cascade,
    foreign key(related_product) references products(id)
        on delete cascade on update cascade
);

drop table if exists photos CASCADE;
create table if not exists photos(
    photo_id int,
    thumbnail_url varchar(255),
    url varchar(255),
    product_styles_id int,
    foreign key(product_styles_id) references product_styles(id)
        on delete cascade on update cascade
);

DROP TYPE IF EXISTS sizes CASCADE;
create TYPE sizes AS ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL');

drop table if exists skus CASCADE;
create table if not exists skus(
    sku_id varchar(100) not null,
    quantity int,
    current_size sizes not null,
    product_styles_id int,
    foreign key(product_styles_id) references product_styles(id)
        on delete cascade on update cascade
);

-- psql postgres -U jerrytapia -f schemas/postgres_schema.sql