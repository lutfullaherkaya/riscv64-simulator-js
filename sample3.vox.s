#include "vox_lib.h"

  .global main
  .text
  .align 2

# fun main();
main:
  addi sp, sp, -104
  sd ra, 96(sp)
  sd s1, 88(sp)
  sd s2, 80(sp)
  sd s3, 72(sp)
  sd s4, 64(sp)
  sd s5, 56(sp)
  sd s6, 48(sp)
  sd s7, 40(sp)
  sd s8, 32(sp)
  sd s9, 24(sp)
  sd s10, 16(sp)
            # vector_set global_a, 0, 1
  ld t1, a_value
  li s1, 0
  li s2, 1
  sd s1, 0(t1)
  sd s2, 8(t1)
            # vector_set global_a, 1, 2
  ld t1, a_value
  addi t1, t1, 16
  li s3, 0
  li s4, 2
  sd s3, 0(t1)
  sd s4, 8(t1)
            # vector_set global_a, 2, 3
  ld t1, a_value
  addi t1, t1, 32
  li s5, 0
  li s6, 3
  sd s5, 0(t1)
  sd s6, 8(t1)
            # vector_set global_a, 3, 4
  ld t1, a_value
  addi t1, t1, 48
  li s7, 0
  li s8, 4
  sd s7, 0(t1)
  sd s8, 8(t1)
            # vector_set global_a, 4, 5
  ld t1, a_value
  addi t1, t1, 64
  li s9, 0
  li s10, 5
  sd s9, 0(t1)
  sd s10, 8(t1)
            # div .tmp0, global_b, global_a
  ld a0, b_type
  ld a1, b_value
  ld a2, a_type
  ld a3, a_value
  call __vox_div__
            # arg .tmp0
  mv t3, a0  #backend: clearing a0 for return val
  mv t4, a1  #backend: clearing a1 for return val
            # call "__vox_print__"
    #backend: saving caller saved regs
  addi sp, sp, -16
  sd t3, 0(sp)
  sd t4, 8(sp)
  call __vox_print__
  ld t3, 0(sp)
  ld t4, 8(sp)
  addi sp, sp, 16
            # return
  ld ra, 96(sp)
  ld s1, 88(sp)
  ld s2, 80(sp)
  ld s3, 72(sp)
  ld s4, 64(sp)
  ld s5, 56(sp)
  ld s6, 48(sp)
  ld s7, 40(sp)
  ld s8, 32(sp)
  ld s9, 24(sp)
  ld s10, 16(sp)
  addi sp, sp, 104
  li a0, 0
  ret

  .data
a_type:    .quad 1
a_value:   .quad a_vector
a_length:  .quad 5
a_vector:
  .quad 0, 0
  .quad 0, 0
  .quad 0, 0
  .quad 0, 0
  .quad 0, 0

b_type:   .quad 0
b_value:  .quad 123

