COPY products FROM '/Users/jerrytapia/rfp2204/sdc_data/product.csv' DELIMITER ',' CSV HEADER;

COPY product_information FROM '/Users/jerrytapia/rfp2204/sdc_data/features.csv' DELIMITER ',' CSV HEADER;

COPY product_styles FROM '/Users/jerrytapia/rfp2204/sdc_data/styles.csv' DELIMITER ',' CSV HEADER;

COPY related_products FROM '/Users/jerrytapia/rfp2204/sdc_data/related.csv' DELIMITER ',' CSV HEADER;

COPY photos FROM '/Users/jerrytapia/rfp2204/sdc_data/photos.csv' DELIMITER ',' CSV HEADER;

COPY skus FROM '/Users/jerrytapia/rfp2204/sdc_data/skus.csv' DELIMITER ',' CSV HEADER;