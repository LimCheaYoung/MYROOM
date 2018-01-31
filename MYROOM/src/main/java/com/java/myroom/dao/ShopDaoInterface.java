package com.java.myroom.dao;

import java.util.HashMap;
import java.util.List;

public interface ShopDaoInterface {

	public List<HashMap<String, Object>> searchshop(HashMap<String, Object> param);
	public List<HashMap<String, Object>> selectshop();
	public HashMap<String, Object> selectpoint(HashMap<String, Object> param);
	public HashMap<String, Object> selecivtem(HashMap<String, Object> param);
	public int uppoint2(HashMap<String, Object> param);
	public int uppoint(HashMap<String, Object> param);
	public List<HashMap<String, Object>> selectmine(HashMap<String, Object> param);
	public int updel(HashMap<String, Object> param);
	public int upshop(HashMap<String, Object> param);
}