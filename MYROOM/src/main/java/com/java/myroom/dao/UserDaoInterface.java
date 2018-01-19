package com.java.myroom.dao;

import java.util.HashMap;

public interface UserDaoInterface {
	
	public int addUser(HashMap<String, Object> param);
	public HashMap<String, Object> selectuser(HashMap<String, Object> param);
	
}
