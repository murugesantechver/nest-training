import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Get()
      @Public()
    getProducts() {
        return this.productsService.getProducts();
    }
}
