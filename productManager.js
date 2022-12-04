import fs from "fs";


/*
console.clear();  */

class ProductManager {

  constructor () {
    this.products = [];  }

      async addProduct (title, description, price, thumbnail, code, stock ) {
        try {

            const product = {
                id: this.#getMaxId() + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };


            if (fs.existsSync("Products.json")) {
                this.#readProducts();

                        if (title == "" || description == "" || price == "" || thumbnail == "" || code == "" || stock== "" ) {
                            console.log ("Incomplete data");
                    
                        } else {

                            if(!this.products.some(p => p.code === product.code)) {
                        
                                this.products.push(product);
                                console.log (this.products); 
                                return product.id;

                            } else {
                                console.log (`This product code ${product.code} already exists.`); 
                            }
                        }

            } else {

                        if (title == "" || description == "" || price == "" || thumbnail == "" || code == "" || stock== "" ) {
                            console.log ("Incomplete data");
                    
                        } else {

                            if(!this.products.some(p => p.code === product.code)) {
                        
                                this.products.push(product);
                                console.log (this.products); 
                                return product.id;

                            } else {
                                console.log (`This product code ${product.code} already exists.`); 
                            }
                        }
            }
            fs.promises.writeFile("Products.json", JSON.stringify(this.products));

        } catch (error) {
            console.log(error);
            throw new Error(error);
            }
      
        };


    async getProducts () {
        await this.#readProducts();

        if (this.products.length === 0) {
            console.log("Empty list");
            return;
            } else {
            console.log(this.products);
        }
    };

    async getProductById (idProduct) {
        await this.#readProducts();

        const product = this.#getId(idProduct);
            if (product) {
            console.log(product);
            } else {
            console.log("Product not found");
            }
    };

    async #readProducts() {
        const products = JSON.parse(await fs.promises.readFile("Products.json", "utf-8"));
        this.products = products;
    };

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    };

    async #getId(idProduct) {
        await this.#readProducts();
        return this.products.find((product) => product.id === idProduct);
    };

}


const productManager = new ProductManager();

/* Retorna leyenda lista vacía */
productManager.getProducts ();

/* Retorna arrays con productos ingresados */
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123", 25);
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc124", 25);
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc125", 25);

/* Retorna lista de productos cargados */
productManager.getProducts ();

/* No se agrega por código repetido */
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc125", 25);

/* No se agrega por falta de datos */
productManager.addProduct ("","Este es un producto prueba",200,"Sin imagen","abc126", 25);

/* Retorna producto seleccionado por ID */
productManager.getProductById (3);

/* Id no encontrado */
productManager.getProductById (8);



