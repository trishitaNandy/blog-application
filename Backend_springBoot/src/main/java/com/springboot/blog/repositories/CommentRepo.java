package com.springboot.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.blog.entities.Comment;

public interface CommentRepo extends JpaRepository<Comment, Integer>{

}
