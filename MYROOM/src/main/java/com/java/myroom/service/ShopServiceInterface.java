package com.java.myroom.service;

import java.util.HashMap;
import java.util.List;

public interface ShopServiceInterface {

	public HashMap<String, Object> selectshop();
	public HashMap<String, Object> searchshop(HashMap<String, Object> param);
	public HashMap<String, Object> addpoint(HashMap<String, Object> param);
	public HashMap<String, Object>  selectmine(HashMap<String, Object> param);
	public HashMap<String, Object>  updel(HashMap<String, Object> param);
	public HashMap<String, Object>  upshop(HashMap<String, Object> param);
	
}