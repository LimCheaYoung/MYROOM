package com.java.myroom.service;

import java.util.HashMap;
import java.util.List;

public interface MyroomServiceInterface {
	
	public HashMap<String, Object> addshop(HashMap<String, Object> param) throws Exception;
	public HashMap<String, Object> uptile(HashMap<String, Object> param);
	public HashMap<String, Object> additem(HashMap<String, Object> param) throws Exception;
	public HashMap<String, Object> addinven(HashMap<String, Object> param);
	public HashMap<String, Object> selectinven(HashMap<String, Object> param);
}
