package com.java.myroom.dao;

import java.util.HashMap;
import java.util.List;

public interface MyroomDaoInterface {
	
	public int uptile(HashMap<String, Object> param);
	public int upobject(HashMap<String, Object> param);
	public int additem(HashMap<String, Object> param);
	public int addinven(HashMap<String, Object> param);
	public int addshop(HashMap<String, Object> param);
	public HashMap<String, Object> selectitem(HashMap<String, Object> param);
	public List<HashMap<String, Object>> selectinven(HashMap<String, Object> param);
}
