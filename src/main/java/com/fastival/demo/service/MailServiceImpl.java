package com.fastival.demo.service;

import com.fastival.demo.model.dao.MailDAO;
import com.fastival.demo.model.dto.MailDTO;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;

@Service
public class MailServiceImpl implements MailService {

    @Inject
    MailDAO mailDAO;

    @Inject
    JavaMailSender emailSender;

    @Inject
    TemplateEngine templateEngine;

    @Override
    public void insertMailCertification(MailDTO dto) {
        mailDAO.insertMailCertification(dto);
    }

    @Override
    public Map<String,Object> selectCheckCount(MailDTO dto) {
        Map<String,Object> map = mailDAO.selectCheckCount(dto);
        return map;
    }

    @Override
    public void updateMailCertification(MailDTO dto) {
        mailDAO.updateMailCertification(dto);
    }

    @Override
    public boolean sendMail(String to, String subject, String text) {
        MimeMessagePreparator message = mimeMessage -> {
            String content = build(text);
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);
            messageHelper.setText(content, true);
        };
        try {
            emailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public String build(String text) {
        Context context = new Context();
        context.setVariable("text", text);
        return templateEngine.process("/member/mail", context);
    }
}
