package com.java.myroom.service;

import java.util.HashMap;

public interface UserServiceInterface {
	
	public HashMap<String, Object> addUser(HashMap<String, Object> param);
	public HashMap<String, Object> selectUser(HashMap<String, Object> param);
	
}
