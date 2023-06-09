package com.springboot.blog.services;

import java.util.List;


import com.springboot.blog.payloads.UserDto;

public interface UserService {
	
	int registerNewUser(UserDto user);
	
	UserDto createUser(UserDto user);
	UserDto updateUser(UserDto user,Integer userId);
	UserDto getUserById(Integer userId);
	List<UserDto> getAllUsers();
	void deleteUser(Integer userId);
}
