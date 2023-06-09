package com.springboot.blog.services;

import java.util.List;

import com.springboot.blog.payloads.CategoryDto;

public interface CategoryService {
	//create
	CategoryDto createCategory(CategoryDto categoryDto);
	
	//update
	CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId);
	
	//delete
	public void deleteCategory(Integer categoryId);
	
	//get
	public CategoryDto getCategory(Integer categoryId);
	
	//get All
	List<CategoryDto> getCategories();
}
