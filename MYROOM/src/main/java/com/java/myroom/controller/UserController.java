package com.java.myroom.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.java.myroom.dao.UserDaoInterface;
import com.java.myroom.service.UserServiceInterface;
import com.java.myroom.util.HttpUtil;

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

@Controller
public class UserController {
	
	@Autowired
	UserServiceInterface usi;
	@Autowired
	UserDaoInterface udi;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ModelAndView login(HttpServletRequest req, HttpSession session){
		HashMap<String, Object> param = HttpUtil.getParameterMap(req);
		HashMap<String, Object> result = usi.addUser(param);
		if(result.containsKey("msg")) {
			return HttpUtil.returnJson(result);
		}else {
			result = new HashMap<String, Object>();
			
			if(session.getAttribute("user") == null) {
				session.setAttribute("user", param);
				result.put("user", param);
				result.put("status", 1);
			}else {
				result.put("status", 0);
			}
			return HttpUtil.returnJson(result);
		}
	}
	@RequestMapping(value = "/session", method = RequestMethod.POST)
	public ModelAndView session(HttpServletRequest req, HttpSession session){
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("user", session.getAttribute("user"));
		if(session.getAttribute("user") == null) {
			result.put("status", 0);
		}else {
			result.put("status", 1);
		}
		return HttpUtil.returnJson(result);
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public ModelAndView logout(HttpServletRequest req, HttpSession session){
		session.invalidate();
		session = req.getSession();
		return session(req, session);
	}
}
