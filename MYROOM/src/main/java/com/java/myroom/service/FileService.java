package com.java.myroom.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import org.apache.commons.net.util.Base64;
import org.springframework.stereotype.Service;

@Service
public class FileService implements FileServiceInterface {

	@Override
	public void Fileupload(String path, String imgbase64, String savename) throws Exception {
		/**
		 * imgbase64 (imgbase64data:image/png;base64,iVBORw0KGgoAA 로 시작)
		 * saveFilePath (저장경로)
		 * savename (파일이름)
		 */ 
		try {
			// create a buffered image
			BufferedImage image = null;

			String[] base64Arr = imgbase64.split(","); // image/png;base64, 이 부분 버리기 위한 작업
			byte[] imageByte = Base64.decodeBase64(base64Arr[1]); // base64 to byte array로 변경
			
			ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
			image = ImageIO.read(bis);
			bis.close();
			
//			String path = req.getSession().getServletContext().getRealPath("/") + path2;
			System.out.println("Fileupload : " + path);
			path += "resources/item/";
			// write the image to a file
			File outputfile = new File(path + savename + ".png");
			ImageIO.write(image, "png", outputfile); // 파일생성
			
		} catch (IOException e) {
			throw e;
		}
	}
}