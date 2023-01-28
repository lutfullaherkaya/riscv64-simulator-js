#include "vox_lib.h"

  .global main
  .text
  .align 2

# fun main();
main:
  addi sp, sp, -24
  sd ra, 16(sp)
            # call .tmp0, "f"
  call f
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
            # return
  ld ra, 16(sp)
  addi sp, sp, 24
  li a0, 0
  ret

# fun f();
f:
  addi sp, sp, -344
  sd ra, 336(sp)
  sd s1, 328(sp)
  sd s2, 320(sp)
  sd s3, 312(sp)
  sd s4, 304(sp)
  sd s5, 296(sp)
  sd s6, 288(sp)
  sd s7, 280(sp)
  sd s8, 272(sp)
  sd s9, 264(sp)
  sd s10, 256(sp)
            # vector vektor2, 3
  ld s1, 80(sp)
  ld s2, 88(sp)
  li s1, 1
  addi s2, sp, 104
  li t0, 3
  sd t0, 96(sp)
            # vector_set vektor2, 0, 4
  mv t1, s2
  li s3, 0
  li s4, 4
  sd s3, 0(t1)
  sd s4, 8(t1)
            # vector_set vektor2, 1, 5
  mv t1, s2
  addi t1, t1, 16
  li s5, 0
  li s6, 5
  sd s5, 0(t1)
  sd s6, 8(t1)
            # vector_set vektor2, 2, 6
  mv t1, s2
  addi t1, t1, 32
  li s7, 0
  li s8, 6
  sd s7, 0(t1)
  sd s8, 8(t1)
            # vector vektor, 5
  ld s9, 152(sp)
  ld s10, 160(sp)
  li s9, 1
  addi s10, sp, 176
  li t0, 5
  sd t0, 168(sp)
            # vector_set vektor, 0, 1
  mv t1, s10
  li t3, 0
  li t4, 1
  sd t3, 0(t1)
  sd t4, 8(t1)
            # vector_set vektor, 1, 2
  mv t1, s10
  addi t1, t1, 16
  li t5, 0
  li t6, 2
  sd t5, 0(t1)
  sd t6, 8(t1)
            # vector_set vektor, 2, 3
  mv t1, s10
  addi t1, t1, 32
  li a0, 0
  li a1, 3
  sd a0, 0(t1)
  sd a1, 8(t1)
            # vector_set vektor, 3, vektor2
  mv t1, s10
  addi t1, t1, 48
  sd s1, 0(t1)
  sd s2, 8(t1)
            # vector_set vektor, 4, "123"
  mv t1, s10
  addi t1, t1, 64
  li a2, 3
  la a3, .L_string2
  sd a2, 0(t1)
  sd a3, 8(t1)
            # arg vektor
  mv a0, s9
  mv a1, s10
            # call "__vox_print__"
  call __vox_print__
            # arg vektor2
  mv a0, s1
  mv a1, s2
            # call "__vox_print__"
  call __vox_print__
            # copy a, 0
  li a4, 0
  li a5, 0
            # copy b, "string"
  li a6, 3
  la a7, .L_string1
            # copy x, 1
  li s3, 0
  li s4, 1
            # copy d, 123
  li s5, 0
  li s6, 123
            # copy e, "string"
  li s7, 3
  la s8, .L_string1
            # return 123
  li a0, 0
  li a1, 123
  ld ra, 336(sp)
  ld s1, 328(sp)
  ld s2, 320(sp)
  ld s3, 312(sp)
  ld s4, 304(sp)
  ld s5, 296(sp)
  ld s6, 288(sp)
  ld s7, 280(sp)
  ld s8, 272(sp)
  ld s9, 264(sp)
  ld s10, 256(sp)
  addi sp, sp, 344
  ret

  .data
.L_string1:  .string "string"
.L_string2:  .string "123"
