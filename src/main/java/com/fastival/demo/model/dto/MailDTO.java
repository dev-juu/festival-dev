package com.fastival.demo.model.dto;

import java.util.Date;

public class MailDTO {
    private int mail_no;
    private String mail_address;
    private String mail_key;
    private int mail_state;
    private Date mail_send_dt;

    public int getMail_no() {
        return mail_no;
    }

    public void setMail_no(int mail_no) {
        this.mail_no = mail_no;
    }

    public String getMail_address() {
        return mail_address;
    }

    public void setMail_address(String mail_address) {
        this.mail_address = mail_address;
    }

    public String getMail_key() {
        return mail_key;
    }

    public void setMail_key(String mail_key) {
        this.mail_key = mail_key;
    }

    public int getMail_state() {
        return mail_state;
    }

    public void setMail_state(int mail_state) {
        this.mail_state = mail_state;
    }

    public Date getMail_send_dt() {
        return mail_send_dt;
    }

    public void setMail_send_dt(Date mail_send_dt) {
        this.mail_send_dt = mail_send_dt;
    }

    @Override
    public String toString() {
        return "MailDTO{" +
                "mail_no=" + mail_no +
                ", mail_address='" + mail_address + '\'' +
                ", mail_key='" + mail_key + '\'' +
                ", mail_state='" + mail_state + '\'' +
                ", mail_send_dt=" + mail_send_dt +
                '}';
    }
}
