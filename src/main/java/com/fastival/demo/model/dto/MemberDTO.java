package com.fastival.demo.model.dto;

import java.util.Date;

public class MemberDTO {
    private int mem_idx;
    private String mem_email;
    private String mem_passwd;
    private String mem_nickname;
    private int mem_state;
    private Date mem_insert_dt;
    private Date mem_delete_dt;

    public int getMem_idx() {
        return mem_idx;
    }

    public void setMem_idx(int mem_idx) {
        this.mem_idx = mem_idx;
    }

    public String getMem_email() {
        return mem_email;
    }

    public void setMem_email(String mem_email) {
        this.mem_email = mem_email;
    }

    public String getMem_passwd() {
        return mem_passwd;
    }

    public void setMem_passwd(String mem_passwd) {
        this.mem_passwd = mem_passwd;
    }

    public String getMem_nickname() {
        return mem_nickname;
    }

    public void setMem_nickname(String mem_nickname) {
        this.mem_nickname = mem_nickname;
    }

    public int getMem_state() {
        return mem_state;
    }

    public void setMem_state(int mem_state) {
        this.mem_state = mem_state;
    }

    public Date getMem_insert_dt() {
        return mem_insert_dt;
    }

    public void setMem_insert_dt(Date mem_insert_dt) {
        this.mem_insert_dt = mem_insert_dt;
    }

    public Date getMem_delete_dt() {
        return mem_delete_dt;
    }

    public void setMem_delete_dt(Date mem_delete_dt) {
        this.mem_delete_dt = mem_delete_dt;
    }

    @Override
    public String toString() {
        return "MemberDTO{" +
                "mem_idx=" + mem_idx +
                ", mem_email='" + mem_email + '\'' +
                ", mem_passwd='" + mem_passwd + '\'' +
                ", mem_nickname='" + mem_nickname + '\'' +
                ", mem_state=" + mem_state +
                ", mem_insert_dt=" + mem_insert_dt +
                ", mem_delete_dt=" + mem_delete_dt +
                '}';
    }
}
