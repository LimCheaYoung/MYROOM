package com.java.myroom.service;

import java.util.HashMap;
import java.util.List;

public interface FriendServiceInterface {
	
	public HashMap<String, Object> selectbest();
	public HashMap<String, Object> findroom(HashMap<String, Object> param);
	public HashMap<String, Object> selectfriend(HashMap<String, Object> param);
}
