package com.java.myroom.dao;

import java.util.HashMap;
import java.util.List;

public interface FriendDaoInterface {
	
	public List<HashMap<String, Object>> selectbest();
	public HashMap<String, Object> findroom(HashMap<String, Object> param);
	public List<HashMap<String, Object>> selectfriend(HashMap<String, Object> param);
}
