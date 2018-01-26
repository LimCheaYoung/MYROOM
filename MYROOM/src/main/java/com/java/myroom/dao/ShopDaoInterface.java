package com.java.myroom.dao;

import java.util.HashMap;
import java.util.List;

public interface ShopDaoInterface {

	public List<HashMap<String, Object>> searchshop(HashMap<String, Object> param);
	public List<HashMap<String, Object>> selectshop();
}