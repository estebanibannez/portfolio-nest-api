import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { handleException } from 'src/exception/handle.exception';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Res() response, @Body() createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryService.create(createCategoryDto);
      return response.status(HttpStatus.OK).json({
        message: 'Category has been created successfully',
        newCategory,
      });
    } catch (error) {
      handleException(error, 'category', response);
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const data = await this.categoryService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All Categories data found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.categoryService.findOne(term);
  }

  @Put(':term')
  async update(
    @Res() response,
    @Param('term') term: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const existingCategory = await this.categoryService.update(
        term,
        updateCategoryDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Category has been successfully updated',
        existingCategory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    const deletedCategory = await this.categoryService.remove(id);
    return response.status(HttpStatus.OK).json({
      message: 'Category deleted successfully',
      deletedCategory,
    });
  }
}
