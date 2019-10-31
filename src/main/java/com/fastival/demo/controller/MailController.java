package com.fastival.demo.controller;

import com.fastival.demo.model.dto.MailDTO;
import com.fastival.demo.service.MailService;
import com.fastival.demo.util.CommonUntil;
import com.fastival.demo.util.CustomReturn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.util.Map;

@Controller
@RequestMapping("/mail/*")
public class MailController {

    @Inject
    MailService mailService;

    @RequestMapping(value = "send", method = RequestMethod.GET)
    public ResponseEntity<?> send_mail(@RequestBody MailDTO dto) {
        String mail_address = dto.getMail_address();
        if (!CommonUntil.isEmpty(mail_address)) { //이메일 값이 존재
            String subject = "[Fastival] 이메일 계정을 인증해주세요 (`" + mail_address + "`)";
            String mail_key = String.valueOf(1000 + (int) (Math.random() * 10000));
            if (mailService.sendMail(mail_address, subject, mail_key)) { //메일 전송 성공
                dto.setMail_key(mail_key);
                this.insert_mail(dto);
                return new ResponseEntity(new CustomReturn(200, "Mail Send success.", null), HttpStatus.OK);
            } else { //메일 전송 실패
                return new ResponseEntity(new CustomReturn(500, "Mail Send Error.", null), HttpStatus.SERVICE_UNAVAILABLE);
            }
        } else { //이메일 값이 없음
            return new ResponseEntity(new CustomReturn(400, "[Mail Send] Null Point Exception.", null), HttpStatus.NOT_FOUND);
        }
    }

    public void insert_mail(MailDTO dto) {
        mailService.insertMailCertification(dto);
    }

    @RequestMapping(value = "certification", method = RequestMethod.POST)
    public ResponseEntity<?> selectMailCertification(@RequestBody MailDTO dto) {
        Map<String, Object> map = mailService.selectCheckCount(dto);
        int count = Integer.valueOf(String.valueOf(map.get("count(*)")));
        if (count > 0 && 2 > count) {
            int mail_no = Integer.valueOf(String.valueOf(map.get("mail_no")));
            dto.setMail_no(mail_no);
            dto.setMail_state(1);
            mailService.updateMailCertification(dto);
            return new ResponseEntity(new CustomReturn(200, "Mail Certification success.", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new CustomReturn(400, "Mail Certification fail.", null), HttpStatus.NOT_FOUND);
        }
    }

}
