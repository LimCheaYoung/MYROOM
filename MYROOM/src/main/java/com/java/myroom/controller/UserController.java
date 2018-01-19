package com.java.myroom.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;


import com.java.myroom.service.UserServiceInterface;
import com.java.myroom.util.HttpUtil;

@Controller
public class UserController {
	
	@Autowired
	UserServiceInterface usi;
	
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public ModelAndView addUser(HttpServletRequest req){
		return HttpUtil.returnJson(usi.addUser(HttpUtil.paramMap(req)));
	}
	
	@RequestMapping(value = "/selectUser", method = RequestMethod.POST)
	public ModelAndView login(HttpServletRequest req){
		return HttpUtil.returnJson(usi.selectUser(HttpUtil.paramMap(req)));
	}
}
