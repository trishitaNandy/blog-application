package com.springboot.blog.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.blog.config.AppConstants;
import com.springboot.blog.entities.Role;
import com.springboot.blog.entities.User;
import com.springboot.blog.payloads.UserDto;
import com.springboot.blog.repositories.RoleRepo;
import com.springboot.blog.repositories.UserRepo;
import com.springboot.blog.services.UserService;
import com.springboot.blog.exceptions.*;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Override
	public UserDto createUser(UserDto userDto) {
		System.out.println(userDto);
		User user=this.dtoToUser(userDto);
		User savedUser =this.userRepo.save(user);
		return this.userToDto(savedUser);
	}

	@Override
	public UserDto updateUser(UserDto userDto, Integer userId) {
		User user=this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User","Id",userId));
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getAbout());
		
		User updatedUser=this.userRepo.save(user);
		UserDto userDto1=this.userToDto(updatedUser);
		
		return userDto1;
	}

	@Override
	public UserDto getUserById(Integer userId) {
		User user=this.userRepo.findById(userId)
				.orElseThrow(()->new ResourceNotFoundException("User","Id",userId));
		return this.userToDto(user);
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users= this.userRepo.findAll();
		List<UserDto> userDtos= users.stream().map(user->this.userToDto(user)).collect(Collectors.toList());
		
		return userDtos;
	}

	@Override
	public void deleteUser(Integer userId) {
		User user= this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User", "Id", userId));
		this.userRepo.delete(user);
	}
	public User dtoToUser(UserDto userDto) {
		User user=this.modelMapper.map(userDto,  User.class);
		/*user.setId(userDto.getId());
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setAbout(userDto.getAbout());
		user.setPassword(userDto.getPassword());*/
		return user;
	}
	public UserDto userToDto(User user) {
		UserDto userDto=this.modelMapper.map(user,  UserDto.class);
		/*userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setEmail(user.getEmail());
		userDto.setAbout(user.getAbout());
		userDto.setPassword(user.getPassword());*/
		return userDto;
	}

	@Override
	public int registerNewUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);
	    if(userDto.getName().length()<4) {
	    	return -1;
	    }
	    
	    //if(userDto.getPassword().length()<1) {
	    //	return -3;
	    //}
	    if(userDto.getEmail().length()<1) {
	    	return -2;
	    }
	    if (userRepo.existsByEmail(userDto.getEmail())  ) {
	        return -3;
	    }
	    
	    if(userDto.getPassword().length()<1) {
	    	return -4;
	    }
		//encoded the password
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		
		//roles
		Role role = this.roleRepo.findById(AppConstants.NORMAL_USER).get();
		
		user.getRoles().add(role);
		
		User newUser=this.userRepo.save(user);
		
		return user.getId();
	}

}
