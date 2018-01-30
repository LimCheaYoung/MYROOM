package com.java.myroom.dao;

import java.util.HashMap;
import java.util.List;

public interface FriendDaoInterface {
	
	public List<HashMap<String, Object>> selectbest();
	public int addfriend(HashMap<String, Object> param);
	public int delfriend(HashMap<String, Object> param);
	public HashMap<String, Object> findroom(HashMap<String, Object> param);
	public HashMap<String, Object> selectmyfriend(HashMap<String, Object> param);
	public List<HashMap<String, Object>> myfriend(HashMap<String, Object> param);
	public List<HashMap<String, Object>> selectfriend(HashMap<String, Object> param);
}
