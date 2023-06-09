package com.springboot.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.blog.entities.Role;

public interface RoleRepo extends JpaRepository<Role, Integer>{
	
}
