import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Category } from 'src/category/entities/category.entity';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be All categories', async () => {
    expect(service.findAll()).toEqual({
      message: 'All Categories data found successfully',
      data: [],
    });
  });
});
