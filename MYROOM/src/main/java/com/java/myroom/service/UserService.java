package com.java.myroom.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.myroom.dao.UserDao;
import com.java.myroom.dao.UserDaoInterface;

@Service
public class UserService implements UserServiceInterface {
	@Autowired
	UserDaoInterface udi;
	
	@Override
	public HashMap<String, Object> addUser(HashMap<String, Object> param){
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("status", udi.addUser(param));
		return result;
	}
	
	@Override
	public HashMap<String, Object> selectUser(HashMap<String, Object> param){
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("result", udi.selectuser(param));
		return result;
	}
}
