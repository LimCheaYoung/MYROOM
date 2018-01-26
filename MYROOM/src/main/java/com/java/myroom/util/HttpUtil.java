package com.java.myroom.util;

import java.util.Enumeration;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.servlet.ModelAndView;

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

public class HttpUtil {

	public static ModelAndView	returnJson(final HashMap<String, Object> result) {
		
		ModelAndView mav = new ModelAndView();
		
		JSONObject jsonObject = new JSONObject();
		jsonObject = JSONObject.fromObject(JSONSerializer.toJSON(result));
		mav.addObject("message", jsonObject.toString());
		mav.setViewName("json");
		
		return mav;
	}
	
	public static HashMap<String, Object> paramMap(HttpServletRequest req){
		HashMap<String, Object> params = new HashMap<String, Object>();
		
		Enumeration<?> enums = req.getParameterNames();
		
		while(enums.hasMoreElements()){
			String paramName = (String) enums.nextElement();
			String[] parameters = req.getParameterValues(paramName);
			
			if(parameters.length > 1){
				params.put(paramName, parameters);
			} else {
				// 예외 처리 할 경우에만 사용 할것.
				try {
					params.put(paramName, parameters[0]);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		return params;
	}
	
    public static boolean isInteger(String s) {
		try {
			Integer.parseInt(s);
		} catch (NumberFormatException e) {
			return false;
		} catch (NullPointerException e) {
			return false;
		}
		return true;
	}
	
    public static HashMap<String, Object> getParameterMap(HttpServletRequest request) {
		HashMap<String, Object> parameterMap = new HashMap<String, Object>();
		Enumeration<?> enums = request.getParameterNames();
		while (enums.hasMoreElements()) {
			String paramName = (String) enums.nextElement();
			String[] parameters = request.getParameterValues(paramName);
			// Parameter 확인
			if (parameters.length > 1) {
				parameterMap.put(paramName, parameters);
				// Parameter 담기
			} else {
				try {
					/*
					 * parameters[0] = parameters[0].replaceAll("%", "%25");
					 * parameterMap.put(paramName,
					 * URLDecoder.decode(parameters[0],"UTF-8"));
					 */
					parameterMap.put(paramName, parameters[0]);

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return parameterMap;
	}
}
