package com.fastival.demo.service;

import com.fastival.demo.model.dto.MailDTO;

import java.util.List;
import java.util.Map;

public interface MailService {

    public void insertMailCertification(MailDTO dto); //메일 인증시 삽입

    public Map<String,Object> selectCheckCount(MailDTO dto); //일치하는 개수와 mail_no 출력

    public void updateMailCertification(MailDTO dto); //state 업데이트

    public boolean sendMail(String to,String subject, String text);

    public int selectLastInsertId();

}
