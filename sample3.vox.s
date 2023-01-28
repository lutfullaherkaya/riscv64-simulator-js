#include "vox_lib.h"

  .global main
  .text
  .align 2

# fun main();
main:
  addi sp, sp, -40
  sd ra, 32(sp)
            # arg 5
  li a0, 0
  li a1, 5
            # call .tmp0, "fib"
  call fib
            # arg .tmp0
  mv a6, a0  #backend: clearing a0 for return val
  mv a7, a1  #backend: clearing a1 for return val
            # call "__vox_print__"
    #backend: saving caller saved regs
  addi sp, sp, -16
  sd a6, 0(sp)
  sd a7, 8(sp)
  call __vox_print__
  ld a6, 0(sp)
  ld a7, 8(sp)
  addi sp, sp, 16
            # arg 10
  li a0, 0
  li a1, 10
            # call .tmp1, "even"
    #backend: saving caller saved regs
  addi sp, sp, -16
  sd a6, 0(sp)
  sd a7, 8(sp)
  call even
  ld a6, 0(sp)
  ld a7, 8(sp)
  addi sp, sp, 16
            # arg .tmp1
  mv a4, a0  #backend: clearing a0 for return val
  mv a5, a1  #backend: clearing a1 for return val
            # call "__vox_print__"
    #backend: saving caller saved regs
  addi sp, sp, -32
  sd a6, 0(sp)
  sd a7, 8(sp)
  sd a4, 16(sp)
  sd a5, 24(sp)
  call __vox_print__
  ld a6, 0(sp)
  ld a7, 8(sp)
  ld a4, 16(sp)
  ld a5, 24(sp)
  addi sp, sp, 32
            # return
  ld ra, 32(sp)
  addi sp, sp, 40
  li a0, 0
  ret

# fun fib(n);
fib:
  addi sp, sp, -184
  sd ra, 176(sp)
  sd s1, 168(sp)
  sd s2, 160(sp)
  sd s3, 152(sp)
  sd s4, 144(sp)
  sd s5, 136(sp)
  sd s6, 128(sp)
  sd s7, 120(sp)
  sd s8, 112(sp)
            # param n
            # <= .tmp0, n, 1
  li s1, 0
  li s2, 1
  li s3, 2
  slt s4, a1, s2
  sub t0, a1, s2
  seqz t0, t0
  or s4, s4, t0
    #backend: spilling n at basic block end
  sd a0, 0(sp)
  sd a1, 8(sp)
            # branch_if_false .tmp0, ".L_endif1"
  beq s4, zero, .L_endif1
            # return 1
  li a0, 0
  li a1, 1
  ld ra, 176(sp)
  ld s1, 168(sp)
  ld s2, 160(sp)
  ld s3, 152(sp)
  ld s4, 144(sp)
  ld s5, 136(sp)
  ld s6, 128(sp)
  ld s7, 120(sp)
  ld s8, 112(sp)
  addi sp, sp, 184
  ret
            # label ".L_endif1"
.L_endif1:
            # sub .tmp2, n, 1
  ld a0, 0(sp)
  ld a1, 8(sp)
  li a2, 0
  li a3, 1
  call __vox_sub__
            # arg .tmp2
  mv s1, a0  #backend: clearing a0 for return val
  mv s2, a1  #backend: clearing a1 for return val
            # call .tmp3, "fib"
  call fib
            # sub .tmp4, n, 2
  mv a6, a0  #backend: clearing a0 for return val
  mv a7, a1  #backend: clearing a1 for return val
  ld a0, 0(sp)
  ld a1, 8(sp)
  li a2, 0
  li a3, 2
  call __vox_sub__
            # arg .tmp4
  mv a4, a0  #backend: clearing a0 for return val
  mv a5, a1  #backend: clearing a1 for return val
            # call .tmp5, "fib"
    #backend: saving caller saved regs
  addi sp, sp, -32
  sd a6, 0(sp)
  sd a7, 8(sp)
  sd a4, 16(sp)
  sd a5, 24(sp)
  call fib
  ld a6, 0(sp)
  ld a7, 8(sp)
  ld a4, 16(sp)
  ld a5, 24(sp)
  addi sp, sp, 32
            # add .tmp1, .tmp3, .tmp5
  mv s3, a0  #backend: clearing a0 for return val
  mv s4, a1  #backend: clearing a1 for return val
  mv a0, a6
  mv a1, a7
  mv a2, s3
  mv a3, s4
  call __vox_add__
            # return .tmp1
  ld ra, 176(sp)
  ld s1, 168(sp)
  ld s2, 160(sp)
  ld s3, 152(sp)
  ld s4, 144(sp)
  ld s5, 136(sp)
  ld s6, 128(sp)
  ld s7, 120(sp)
  ld s8, 112(sp)
  addi sp, sp, 184
  ret

# fun even(n);
even:
  addi sp, sp, -136
  sd ra, 128(sp)
  sd s1, 120(sp)
  sd s2, 112(sp)
  sd s3, 104(sp)
  sd s4, 96(sp)
  sd s5, 88(sp)
  sd s6, 80(sp)
            # param n
            # == .tmp0, n, 0
  li s1, 0
  li s2, 0
  li s3, 2
  sub t0, a1, s2
  seqz s4, t0
    #backend: spilling n at basic block end
  sd a0, 0(sp)
  sd a1, 8(sp)
            # branch_if_false .tmp0, ".L_endif2"
  beq s4, zero, .L_endif2
            # return True
  li a0, 2
  li a1, 1
  ld ra, 128(sp)
  ld s1, 120(sp)
  ld s2, 112(sp)
  ld s3, 104(sp)
  ld s4, 96(sp)
  ld s5, 88(sp)
  ld s6, 80(sp)
  addi sp, sp, 136
  ret
            # branch ".L_endelse2"
  j .L_endelse2
            # label ".L_endif2"
.L_endif2:
            # < .tmp1, n, 0
  ld s1, 0(sp)
  ld s2, 8(sp)
  li s3, 0
  li s4, 0
  li s5, 2
  slt s6, s2, s4
    #backend: spilling n at basic block end
  sd s1, 0(sp)
  sd s2, 8(sp)
            # branch_if_false .tmp1, ".L_endif3"
  beq s6, zero, .L_endif3
            # return False
  li a0, 2
  li a1, 0
  ld ra, 128(sp)
  ld s1, 120(sp)
  ld s2, 112(sp)
  ld s3, 104(sp)
  ld s4, 96(sp)
  ld s5, 88(sp)
  ld s6, 80(sp)
  addi sp, sp, 136
  ret
            # label ".L_endif3"
.L_endif3:
            # label ".L_endelse2"
.L_endelse2:
            # sub .tmp2, n, 1
  ld a0, 0(sp)
  ld a1, 8(sp)
  li a2, 0
  li a3, 1
  call __vox_sub__
            # arg .tmp2
  mv s1, a0  #backend: clearing a0 for return val
  mv s2, a1  #backend: clearing a1 for return val
            # call .tmp3, "odd"
  call odd
            # return .tmp3
  ld ra, 128(sp)
  ld s1, 120(sp)
  ld s2, 112(sp)
  ld s3, 104(sp)
  ld s4, 96(sp)
  ld s5, 88(sp)
  ld s6, 80(sp)
  addi sp, sp, 136
  ret

# fun odd(n);
odd:
  addi sp, sp, -88
  sd ra, 80(sp)
  sd s1, 72(sp)
  sd s2, 64(sp)
  sd s3, 56(sp)
  sd s4, 48(sp)
            # param n
            # sub .tmp0, n, 1
  mv s1, a0  #backend: clearing a0 for return val
  mv s2, a1  #backend: clearing a1 for return val
  li a2, 0
  li a3, 1
  call __vox_sub__
            # arg .tmp0
  mv s3, a0  #backend: clearing a0 for return val
  mv s4, a1  #backend: clearing a1 for return val
            # call .tmp1, "even"
  call even
            # return .tmp1
  ld ra, 80(sp)
  ld s1, 72(sp)
  ld s2, 64(sp)
  ld s3, 56(sp)
  ld s4, 48(sp)
  addi sp, sp, 88
  ret
