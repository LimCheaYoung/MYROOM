package com.java.myroom.service;

import java.util.HashMap;
import java.util.List;

public interface ShopServiceInterface {

	public HashMap<String, Object> selectshop();
	public HashMap<String, Object> searchshop(HashMap<String, Object> param);
	public HashMap<String, Object> shop(HashMap<String, Object> param);
}