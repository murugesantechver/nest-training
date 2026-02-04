import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    getProducts() {
        return [
            { id: 1, name: 'Product A', price: 100 },
            { id: 2, name: 'Product B', price: 150 },
        ];
    }
}
